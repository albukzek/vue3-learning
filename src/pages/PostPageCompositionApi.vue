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
            >Создать пост</MyButton>
            <MySelect
            v-model="selectedSort"
            :options="sortOptions"
            >
                
            </MySelect>
        </div>
        
        <MyDialog v-model:show="dialogVisible">
            <PostForm/>
        </MyDialog>
     
       <PostList 
        v-if="!isPostLoading"
        :posts="sortedAndSearchedPosts"
        />
        <div v-else>Идет загрузка...</div>
    </div>
   
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import axios from "axios"
import MyButton from '@/components/UI/MyButton.vue'
import {ref} from 'vue'
import {usePosts} from '@/hooks/usePosts'
import useSortedPost from '@/hooks/useSortedPost'
import useSortedAndSearchPost from '@/hooks/useSortedAndSearchPost'
export default {
    components:{
        PostForm,
        PostList,
        MyButton
    },
   data(){
       return {
           dialogVisible: false,
           sortOptions:[
               {value: 'tytle', name:'По названиею'},
               {value: 'body', name:'По описанию'},
           ]
           }
   },
   setup(props){
       const {posts, totalPages, isPostsLoading} = usePosts(10)
       const {selectedSort,sortedPosts} = useSortedPost(posts)
       const {searchQuery,sortedAndSearchedPosts} = useSortedAndSearchPost(sortedPosts)
       return {
           totalPages,
           isPostsLoading,
           selectedSort,
           searchQuery,
           sortedAndSearchedPosts
       }
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