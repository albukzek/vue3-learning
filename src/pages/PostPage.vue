<template>

    <div>  
        <h1>Страница с постами</h1>
        <MyInput
            v-focus
            v-model="searchQuery"
            placeholder="Поиск..."
        />
        <div class="app_btns">
            <MyButton
            @click="showDialog"
            >Создать пост</MyButton>
            <MySelect
            v-model="selectedSort"
            :options="sortOptions"
            >
                
            </MySelect>
        </div>
        
        <MyDialog v-model:show="dialogVisible">
            <PostForm
            @create="createPost" />
        </MyDialog>
     
       <PostList 
        v-if="!isPostLoading"
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        />
        <div v-else>Идет загрузка...</div>

        <div v-intersection="loadMorePosts" class="observer"></div>

        <!-- <div class="page__wrapper">
            <div v-for="pageNumber in totalPages"
             :key="pageNumber"
             class="page"
             :class="{
                 'current-page' : page === pageNumber
             }"
             @click="changePage(pageNumber)"
             >
             {{pageNumber}}
             </div>
        </div> -->
     
      
    </div>
   
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import axios from "axios"
import MyButton from '@/components/UI/MyButton.vue'
export default {
    components:{
        PostForm,
        PostList,
        MyButton
    },
   data(){
       return {
           posts: [],
           dialogVisible: false,
           isPostLoading: false,
           selectedSort: "",
           searchQuery: "",
           page: 1,
           limit: 10,
           totalPages:0,
           sortOptions:[
               {value: 'tytle', name:'По названиею'},
               {value: 'body', name:'По описанию'},
           ]
           }
   },
   methods:{
       createPost(post){
          this.posts.push(post)
          this.dialogVisible = false
       },
    //    changePage(pageNumber){
    //        this.page = pageNumber
    //     //    this.fetchPost()
    //    },
       removePost(post){
           this.posts = this.posts.filter(p => p.id !== post.id)
       },
       showDialog(){
           this.dialogVisible = true
       },
       async fetchPost(){
           try{
              this.isPostLoading = true 
              const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                  params :{
                      _page: this.page,
                      _limit: this.limit
                  }
              })
              this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit) 
              this.posts = response.data
            //   console.log(response)
           } catch(e){
                alert("Err Dev")
           } finally {
               this.isPostLoading = false
           }
       },
        async loadMorePosts(){
           try{
              this.page += 1
              const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                  params :{
                      _page: this.page,
                      _limit: this.limit
                  }
              })
              this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit) 
              this.posts = [...this.posts, ...response.data]
            //   console.log(response)
           } catch(e){
                alert("Err Dev")
           } 
       }
   },
   mounted(){
       this.fetchPost();
    //    this.$refs.observer

      },
   computed:{
       sortedPost(){
           return [...this.posts].sort((post1,post2) =>
           post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
       },
       sortedAndSearchedPosts(){
           return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
       }
   },
   watch: {
    //    page(){
    //        this.fetchPost()
    //    }
    //    selectedSort(newValue){
    //        console.log(newValue)
    //        this.posts.sort((post1,post2) =>
    //        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    //    }
   }
}
</script>

<style>


.app_btns{
    margin: 15px 0; 
    display: flex;
    justify-content: space-between;
}



.page__wrapper{
    display: flex;
    margin-top: 15px;
}

.page{
    border: 1px solid black;
    padding: 10px;
}

.current-page{
    border: 2px solid teal
}

</style>