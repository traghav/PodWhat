<template>
  <div id="app">
    
    <div id="search">
      <v-select v-model="selected" label="collectionName" placeholder="Add Podcasts"  :options="options" @search="search" :clearSearchOnSelect="true">
      <template slot="no-options">
      type to search Podcasts..
    </template>
    <template slot="option" slot-scope="option">
      <div class="d-center">
        <img :src='option.artworkUrl60'/> 
        {{ option.collectionName }}
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <i>{{ option.artistName }}</i>
        </div>
    </template>
    <template slot="selected-option" scope="option">
      <div class="selected d-center">
        <img :src='option.artworkUrl60'/> 
        {{ option.collectionName }}
      </div>
    </template>
    
  </v-select>
  
  </div>
  
  
  
  <div id="selection" v-if="added.length>0">

        <!-- Two -->
      <section id="two" class="wrapper">
        
        <div class="inner alt">
          <h2>{{listname}}</h2>
          <div v-for="option in added">
          <section class="spotlight">
            
            <div class="image"><img :src='option.artworkUrl100'/> </div>
            <div class="content">
              <h3><a :href="'https://pod.link/'+option.collectionId" target="_new">{{option.collectionName}}</a>
                <div class="actions">
                <template v-if="option.star" >
                  <a href="javascript:void(0)" v-on:click="star(option)">⭐</a>
                </template>
                <template v-else>
                  <a href="javascript:void(0)" v-on:click="star(option)"><i class="far fa-star"></i></a>
                </template>
                <a href="javascript:void(0)" v-on:click="remove(option)">❌</a>
                
                <div hidden="true">
                  {{stateChanger}}
                </div>
              </div>
              </h3>
              <p>{{option.artistName}} </p>
            </div>
            
          </section>

         </div>
        </div>


      </section>

    

    <section id="three" class="wrapper">
      <div class="inner">
        <input v-model="listname" placeholder="Name your list" type="text">
              <button type="submit" class="primary" v-on:click="submit" v-bind:disabled="listname.length <= 0 ? true : false">Submit</button>
       <p></p>
        <div id="uurl" v-if="uurl.length>0">View your list at: <a :href="'/#/'+uurl" target="_new">http://podwhat.com/#/{{uurl}}</a>
           <p>

        Share your list on <a :href="'http://twitter.com/share?text=Check out my Podcast list at  &amp;url=http://podwhat.com/#/'+uurl+'&amp;hashtags=podwhat'"> <span class="label"><i class="fab fa-twitter"></i></span></a></p>
        </div>
      </div>
    </section>
  </div>

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
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'app',
  data () {
    return {
      selected:null,
      options:[],
      added:[],
      stateChanger:false,
      searching:false,
      listname:'',
      uurl:''
    }
  },
  methods: {
        search(search,loading) {



        const vm=this;
        loading(true)
        var link=`https://itunes.apple.com/search?term=${encodeURIComponent(search)}&limit=5&media=podcast`
        fetch(link)
          .then(res => res.json())
          .then(res => {
            //console.log(res.results)
            this.options = res.results;
            
            if(res.results.length>0){
              loading(false);  
            }
            
            
          });
          
          
         
        },
        remove(value){
          this.stateChanger=!this.stateChanger
          for (var i = this.added.length - 1; i >= 0; i--) {
            if(this.added[i] == value)
              this.added.splice(i,1)
          }          
        },
        star(value){
          this.stateChanger=!this.stateChanger
          for (var i = this.added.length - 1; i >= 0; i--) {
            if(this.added[i] == value)
              this.added[i].star=!this.added[i].star 
          }          
        },
        submit(){
          const uuidv1 = require('uuid/v1');
          this.uurl=this.slugify(this.listname)+"-"+uuidv1().slice(0,5);
          console.log(this.uurl);
          var submission={
            'uuid':uuidv1(),
            'listname':this.listname,
            'timestamp': Date.now(),
            'starCount':0,
            'podcastlist':this.added
          };
          var database = firebase.database();
          firebase.database().ref('/pw/'+this.uurl).set(submission); 
        },

        slugify(text)
        {
          return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
        }
        

  },
  watch: {
    'selected': function (podcast) {
      var unique=true
      for (var i = this.added.length - 1; i >= 0; i--) {
        if(this.added[i].collectionId==podcast.collectionId)
          unique=false
      }
      if(unique==true){
        console.log(podcast.collectionName)
        podcast['star']=false
        this.added.push(podcast)

      }
    }
  }

}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  
}
#foot {
  bottom: 0;
  position: fixed;
  width: 100%;

}
#search {
  padding: 1em 50px 0.75em 50px ;
  
}
#search img {
  height: auto;
  max-width: 2.5rem;
  margin-right: 1rem;
}

#search .d-center {
  display: flex;
  align-items: center;
}

#search .selected img {
  width: auto;
  max-height: 23px;
  margin-right: 0.5rem;
}

#search .v-select .dropdown li {
  border-bottom: 1px solid rgba(112, 128, 144, 0.1);
}

#search .v-select .dropdown li:last-child {
  border-bottom: none;
}

#search .v-select .dropdown li a {
  padding: 10px 20px;
  width: 100%;
  font-size: 1.25em;
  color: #3c3c3c;
}

#search .v-select .dropdown-menu .active > a {
  color: #fff;
}


</style>
