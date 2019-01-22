const app = new Vue({
  el: "#app",
  data: {
    editUser: null,
    users: []
  },
  methods: {
    updateUser(user) {
      fetch("https://jsonplaceholder.typicode.com/users" + user.id, {
        body: JSON.stringify(user),
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => {
        this.editUser = null;
      });
    }
  },
  mounted() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });
  },
  template: `
    <div>
      <li v-for="user, i in users">
        <ul>
            <li>User Id {{user.id}}</li>
              <li> 
                <div v-if="editUser === user.id">
                  <input v-on:keyup.13="updateUser(user)" v-model="user.name" />
                  <button v-on:click="updateUser(user)">save</button>
                </div>
                <div v-else>
                  User Name: {{user.name}} <button v-on:click="editUser = user.id">edit</button>
                </div>
              </li>
              <li> 
                <div v-if="editUser === user.id">
                  <input v-on:keyup.13="updateUser(user)" v-model="user.email" />
                  <button v-on:click="updateUser(user)">save</button>
                </div>
                <div v-else>
                  User Name: {{user.email}} <button v-on:click="editUser = user.id">edit</button>
                </div>
              </li>
              <li> 
                <div v-if="editUser === user.id">
                  <input v-on:keyup.13="updateUser(user)" v-model="user.company.name" />
                  <button v-on:click="updateUser(user)">save</button>
                </div>
                <div v-else>
                  User Name: {{user.company.name}} <button v-on:click="editUser = user.id">edit</button>
                </div>
              </li>
             
          </ul>
      </li>
    </div>
    `
});
