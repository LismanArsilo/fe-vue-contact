<template>
  <div class="container">
    <div class="boxContainer">
      <div class="headerContent">
        <input type="text" class="inputSearch" placeholder="Search Contacts. . ." v-model="keySearch">
        <router-link :to="{ name: 'contact.create' }" class="buttonCreate">Create Contact</router-link>
      </div>
      <select name="" class="selectSearch" id="" v-model="keyGender">
        <option value="">Choice</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <div class="bodyContent">
        <div class="cardContent" v-for="(contact, index) in contacts.data" :key="index">
          <div class="boxContent">
            <span class="nameItem">{{ contact.name }}</span>
            <span class="phoneItem">{{ contact.phone_number }}</span>
            <span class="genderItem">{{ contact.gender == 'M' ? 'Male' : 'Female' }}</span>
            <span class="addressItem">{{ contact.address }}</span>
          </div>
          <div class="boxAction">
            <router-link :to="{ name: 'contact.edit', params: { id: contact.id } }"
              class="buttonEdit">Edit</router-link>
            <button class="buttonDelete" @click="deleteContact(contact.id)">Delete</button>
          </div>
        </div>
        <div v-if="contacts.data && contacts.data.length <= 0" class="notFound">Data Not Found</div>
      </div>
      <div class="boxPaginate">
        <span class="back" :disabled="contacts.current_page === 1" @click="changePage(contacts.current_page - 1)">
          << </span>
            <div class="boxPaginateCount">
              <span class="currentPage">{{ contacts.current_page }}</span>
              <span class="countPage">{{ contacts.last_page }}</span>
            </div>
            <span class="next" @click="changePage(contacts.current_page + 1)">>></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, watch, ref } from 'vue';
import config from '../../config/config';

export default {
  setup() {
    // Reactive State
    let contacts = ref([]);
    let keySearch = ref("");
    let keyGender = ref("");
    let perviousPage = ref("");
    let nextPage = ref("");
    let currentPage = ref(1);
    let countPage = ref(0);

    const getContact = async () => {
      try {
        const response = await axios.get(config.apiUrl + `/contact`, {
          params: {
            keyword: keySearch.value,
            gender: keyGender.value,
            page: currentPage.value
          }
        });
        const dataResult = response.data.contacts;
        contacts.value = dataResult;
        countPage.value = dataResult.last_page;
      } catch (error) {
        console.error(error.message);
      }
    }

    const changePage = (page) => {
      if (page >= 1 && page <= countPage.value) {
        currentPage.value = page;
        getContact();
      }
    }

    const deleteContact = async (id) => {
      if (confirm("Are you sure you want to delete ?")) {
        try {
          await axios.delete(config.apiUrl + "/contact/" + id);
          contacts.value.data = contacts.value.data.filter(contact => contact.id !== id);
          await getContact();
        } catch (error) {
          console.error(error.message);
        }
      }
    }


    onMounted(async () => {
      await getContact();
    });

    watch([keySearch, keyGender], () => {
      getContact();
    });

    return {
      contacts,
      deleteContact,
      keySearch,
      keyGender,
      changePage
    }
  }
}
</script>