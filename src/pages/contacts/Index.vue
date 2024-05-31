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

    const getContact = async () => {
      try {
        const response = await axios.get(config.apiUrl + `/contact?keyword=${keySearch.value}&gender=${keyGender.value}`);
        const dataResult = response.data.contacts;
        contacts.value = dataResult;
      } catch (error) {
        console.error(error.message);
      }
    }

    const deleteContact = async (id) => {
      try {
        await axios.delete(config.apiUrl + "/contact/" + id);
        contacts.value.data = contacts.value.data.filter(contact => contact.id !== id);
      } catch (error) {
        console.error(error.message);
      }
    }

    onMounted(() => {
      getContact();
    });

    watch([keySearch, keyGender], () => {
      getContact();
    });

    return {
      contacts,
      deleteContact,
      keySearch,
      keyGender
    }
  }
}
</script>