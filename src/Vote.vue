<template>
  <div id="app">
   
    <section id="two" class="wrapper"><div class="inner alt">
        
        <div id="selection" v-if="ballots.length>0">      
          <div v-for="option in ballots">
              <div id="podcast">
                <section class="spotlight">
                  <div class=content>
                    <h2>{{option.feature}}
                      <div class="actions" v-if="starred==false">     
                      <a href="javascript:void(0)" v-on:click="upVote(option.feature)"><i class="fas fa-arrow-up"></i> {{option.VoteCount}}</a> 
                      </div>
                      <div class="actions" v-if="starred==true" style="color: #4696e5">     
                      <i class="fas fa-arrow-up"></i> {{option.VoteCount}} 
                      </div>
                    </h2>
                    <p>{{option.description}}</p>
                  </div>
                  
                  
                </section>               
              </div>   
            </div>
          </div>

          
        </div></section>
   <div id="foot">
    <header id="footer">
      <a :href="'http://twitter.com/raghavtosh'"> <i class="fab fa-twitter"></i></a>
      &nbsp;&nbsp;
      <a :href="'http://twitter.com/raghavtosh'"> <i class="fab fa-github"></i></a>
      &nbsp;&nbsp;
      <a :href="'/'">Create your own list!</a>

       
   </header>
  </div>
   
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'app',
  data () {
    return {
      ballots: [],
      starred: false
    }
  },
  methods: {
    fetchData () {
      console.log("fetchhh!")
      var database = firebase.database();
      const vm=this;
      firebase.database().ref('/Vote/').once('value').then(function(snapshot) {var data = (snapshot.val() && snapshot.val()) || 'null';
           if(data!='null'){
              vm.ballots=data
              

           }
           else {
            alert("Could not find Votes URL")
            vm.$router.push('/')

           }

          });

    },
    upVote(option){
      if(true) {

        this.starred=true;
        for (var i = this.ballots.length - 1; i >= 0; i--) {
          if(this.ballots[i].feature==option) {
            this.ballots[i].VoteCount++;
          }
        }
        var database = firebase.database();
        firebase.database().ref('/Vote/').set(this.ballots); 

      }
      
    }

  },
  
  created () {
    this.fetchData();
  }


}
</script>

<style>
  
</style>