Vue.component('article-card', {
    props: ['article'],
    data() {
        return {

        }
    },
    methods: {
        deleteOneArticle(input){
            console.log("masuk ke method delete one article", input)
            Swal.fire({
                title: 'Do you want to delete your article?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.value) {
                    axios
                        .delete(`${baseURL}/articles/${input._id}`, {headers: {
                            token: localStorage.token
                        }})
                        .then (response => {
                            console.log("berhasil delete article")
                            this.$emit('showmyarticle-request')
                            Swal.fire({
                                type: 'success',
                                title: 'Deleting article is success',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                        .catch(err => {
                            console.log("terjadi error delete article", err)
                        })

                }
              })
        },
        showdetailarticle(input) {
            console.log("masuk request detail artikel di card", input)
            this.$emit('articledetail-request', input)
        },
        showdetailarticleforedit(input){
            console.log("masuk request detail untuk edit", input)
            this.$emit('articleedit-request', input)
        }
    },
    created() {
        console.log('article list is created')
    },
    template: `
        <div class="col-6">
            <div class="card flex-row flex-wrap mb-2" style="background-color: rgba(245, 245, 245, 0.9);">
                <div class="col-md-4 text-center" >
                    <div class="card-header border-0">
                        <img v-if="article.featured_image" :src="article.featured_image" alt="" style="height:150px; width:150px;">
                        <img v-if="!article.featured_image" src="./assets/no_img.jpg" alt="" style="height:150px; width:150px;">
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card-block px-2" >
                        <h4 class="card-title">Title: {{article.title}}</h4>
                        <p class="card-text" v-html="article.content"></p>
                        <p class="card-text">Author: {{article.author.email}}</p>
                        <p class="card-text">Tags: <span class="badge badge-secondary mr-1" v-for="singletag in article.tags"> {{singletag}}</span></p>
                        <a href="#" class="btn btn-success" @click.prevent="showdetailarticle(article)">READ</a>
                        <a href="#" class="btn btn-secondary" @click.prevent="showdetailarticleforedit(article)">EDIT</a>
                        <a href="#" class="btn btn-danger" @click.prevent="deleteOneArticle(article)">DELETE</a>
                    </div>
                </div>
                <div class="card-footer w-100 text-muted">
                    Created Date: {{(article.createdAt).slice(0,10)}}
                </div>
            </div>
        </div>


    `
})