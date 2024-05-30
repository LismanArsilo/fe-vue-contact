<template>
  <div class="container">
    <div class="boxContainer">
      <div class="bodyContent bodyContentCreate">
        <h2 class="titleContent">Update Contact</h2>
        <div class="cardForm">
          <form @submit.prevent="updateContact()" class="inputForm">
            <div class="containerForm">
              <div class="boxInput">
                <div class="contentInput">
                  <label for="name">Name</label>
                  <input class="itemInput" type="text" id="name" placeholder="Input Name" v-model="contact.name">
                  <span class="itemValidation" v-if="validation.name">{{ validation.name[0] }}</span>
                </div>
                <div class="contentInput">
                  <label for="phone">Phone Number</label>
                  <input class="itemInput" type="number" id="phone" placeholder="Input Phone Number"
                    v-model="contact.phone_number">
                  <span class="itemValidation" v-if="validation.phone_number">{{ validation.phone_number[0] }}</span>
                </div>
              </div>
              <div class="boxInput">
                <div class="contentInput">
                  <label for="phone">Gender</label>
                  <select name="" id="" class="itemInput itemSelect" v-model="contact.gender">
                    <option value="">-- Choice --</option>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </select>
                  <span class="itemValidation" v-if="validation.gender">{{ validation.gender[0] }}</span>
                </div>
                <div class="contentInput">
                  <label for="address">Address</label>
                  <input class="itemInput" type="text" id="address" placeholder="Input Address"
                    v-model="contact.address">
                  <span class="itemValidation" v-if="validation.address">{{ validation.address[0] }}</span>
                </div>
              </div>
            </div>
            <div class="containerButton">
              <button class="itemButton" type="submit">Save</button>
              <router-link class="itemButton itemBack" :to="{ name: 'contact.index' }">Cancel</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    let contact = reactive({
      name: '',
      phone_number: '',
      gender: '',
      address: ''
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    const url = "http://127.0.0.1:8000/api";

    onMounted(async () => {
      try {
        const response = await axios.get(`${url}/contact/${route.params.id}`);
        const resultData = response.data.contact
        contact.name = resultData.name;
        contact.phone_number = resultData.phone_number;
        contact.gender = resultData.gender;
        contact.address = resultData.address;
      } catch (error) {
        console.info(error.message);
      }

    });

    const updateContact = async () => {
      try {
        const response = await axios.put(`${url}/contact/${route.params.id}`, contact);
        router.push({
          name: 'contact.index'
        })
      } catch (error) {
        validation.value = error.response.data.message
      }
    }

    return {
      contact,
      validation,
      updateContact,
      router
    }
  }
}
</script>