<template>

    <div>  
       
        <h1>Страница с постами</h1>
        <MyInput
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск..."
        />
        <div class="app_btns">
            <MyButton
            @click="showDialog"
            >Создать пост</MyButton>
            <MySelect
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
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

        <div v-intersection="loadMorePosts" class="observer"></div> -->

        <div class="page__wrapper">
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
        </div>
     
      
    </div>
   
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import axios from "axios"
import MyButton from '@/components/UI/MyButton.vue'
import {mapState, mapSetters, mapActions, mapMutations, mapGetters} from 'vuex'
export default {
    components:{
        PostForm,
        PostList,
        MyButton
    },
   data(){
       return {
          dialogVisible: false
        }
   },
   methods:{
       ...mapMutations({
           setPage: 'post/setPage',
           setSearchQuery: 'post/setSearchQuery',
           setSelectedSort: 'post/setSelectedSort'
       }),
       ...mapActions({
           loadMorePosts: 'post/loadMorePosts',
           fetchPosts: 'post/fetchPost'
       }),
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
      
   },
   mounted(){
        this.fetchPosts();
    //    this.$refs.observer

      },
   computed:{
       ...mapState({
        posts: state => state.post.posts,
        isPostLoading: state => state.post.isPostLoading,
        selectedSort: state => state.post.selectedSort,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPages:state => state.post.totalPages,
        sortOptions: state => state.post.sortOptions,
       }),
       ...mapGetters({
           sortedPost: 'post/sortedPost',
           sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
       })
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