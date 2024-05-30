<template>
  <div class="container">
    <div class="boxContainer">
      <div class="headerContent">
        <input type="text" class="inputSearch" placeholder="Search Contacts. . ." v-model="keySearch">
        <router-link :to="{ name: 'contact.create' }" class="buttonCreate">Create Contact</router-link>
      </div>
      <select name="" class="selectSearch" id="" v-model="keyGender">
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

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, watch, ref } from 'vue';

export default {
  setup() {
    // Reactive State
    let contacts = ref([]);
    let keySearch = ref("");
    let keyGender = ref("");

    const url = "http://127.0.0.1:8000/api";

    const getContact = async () => {
      try {
        const response = await axios.get(url + `/contact?keyword=${keySearch.value}&gender=${keyGender.value}`);
        const dataResult = response.data.contacts;
        contacts.value = dataResult;
      } catch (error) {
        console.error(error.message);
      }
    }

    const searchContact = () => {
      const filteredContacts = contacts.value.filter(contact => {
        return contact.name.toLowerCase().includes(keySearch.value.toLowerCase());
      });
      return filteredContacts;
    }

    const deleteContact = async (id) => {
      try {
        const response = await axios.delete(url + "/contact/" + id);
        contacts.value.data = contacts.value.data.filter(contact => contact.id !== id);
      } catch (error) {
        console.error(error.message);
      }
    }

    onMounted(() => {
      getContact();
    });

    watch(keySearch, () => {
      getContact();
    });

    watch(keyGender, () => {
      getContact();
    });

    return {
      contacts,
      searchContact,
      deleteContact,
      keySearch,
      keyGender
    }
  }
}
</script>