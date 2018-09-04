<template>
  <div id="page">
    
      <section id="two" class="wrapper"><div class="inner alt">
        <h2>{{this.listname}}
          <div class="actions" v-if="starred==false">     
          <a href="javascript:void(0)" v-on:click="upVote()"><i class="fas fa-arrow-up"></i> {{this.starCount}}</a> 
          </div>
          <div class="actions" v-if="starred==true" style="color: #4696e5">     
          <i class="fas fa-arrow-up"></i> {{this.starCount}} 
          </div>
        </h2>
        <div id="selection" v-if="added.length>0">      
          <div v-for="option in added">
              <div id="podcast">
                <section class="spotlight">
                  <div class="image"><img :src='option.artworkUrl100'/> </div>
                  <div class=content>
                    <h3><a :href="'https://pod.link/'+option.collectionId" target="_new">{{option.collectionName}}</a>
                    <div class="actions">
                      <template v-if="option.star" >
                        ⭐
                      </template>
                      <div hidden="true">
                      {{uurl}}
                      </div>
                    </div></h3>
                    <p> {{option.artistName}}</p>
                  </div>
                  
                  
                </section>               
              </div>   
            </div>
          </div>

          <p>
            <a :href="'/'" target="_new">Create your own list</a>
            <p></p>

        Share this list on <a :href="'http://twitter.com/share?text=Check out my Podcast list at  &amp;url=http://podwhat.com/#/'+uurl+'&amp;hashtags=podwhat'"> <span class="label"><i class="fab fa-twitter"></i></span></a></p>
        </div></section>

          <div id="foot">
    <header id="footer">
      <a :href="'http://twitter.com/raghavtosh'"> <i class="fab fa-twitter"></i></a>
      &nbsp;&nbsp;
      <a :href="'http://github.com/traghav/podwhat'"> <i class="fab fa-github"></i></a>
      &nbsp;&nbsp;
      <a :href="'/#/vote'">Vote on new features!</a>
      

       
   </header>
  </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'page',
  data () {
    return {
      uurl: this.$route.params.uurl,
      added:[],
      listname:"",
      timestamp:"",
      starCount:0,
      starred:false,
      allData:null
    }
  },
  methods: {
    fetchData () {
      console.log("fetchhh!")
      var database = firebase.database();
      const vm=this;
      firebase.database().ref('/pw/'+this.$route.params.uurl).once('value').then(function(snapshot) {var data = (snapshot.val() && snapshot.val()) || 'null';
           if(data!='null'){
              vm.allData=data
              vm.listname=data.listname
              vm.timestamp=data.timestamp
              vm.added=data.podcastlist
              vm.starCount=data.starCount

           }
           else {
            alert("Could not find the list URL")
            vm.$router.push('/')

           }

          });

    },
    upVote(){
      if(this.starred==false) {
        this.starred=true;
        this.starCount=this.starCount+1;
        this.allData.starCount=this.allData.starCount+1;
        var database = firebase.database();
        firebase.database().ref('/pw/'+this.$route.params.uurl).set(this.allData); 

      }
      
    }
  },
  created () {
    this.fetchData();
  }


}
</script>

<style>
#page {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
 
}
#foot {
  bottom: 0;
  position: fixed;
  width: 100%;

}
#selection a {
  text-decoration: none;
  outline: none;
  
  vertical-align: top;

}
#selection h3 {
  display: inline;
  vertical-align: top;


}
#podcast {
  margin: 25px;

}
</style>