Vue.component('article-list', {
    props: ['articleList'],
    created() {
        console.log('articlelist is created', this.articleList)
    },
    methods: {
        showdetailarticle(input) {
            console.log("masuk request detail artikel di list", input)
            this.$emit('articledetail-request1', input)
        },
        showdetailarticleforedit(input){
            console.log("masuk request detail untuk edit", input)
            this.$emit('articleedit-request1', input)
        }
    },
    template: `
    <div class="row">            
        <article-card
            v-if="articleList.length >0"
            v-for="articledetail in articleList"
            v-bind:article="articledetail"
            v-on:articledetail-request="showdetailarticle"
            v-on:articleedit-request="showdetailarticleforedit"
            v-on:showmyarticle-request="$emit('showmyarticle-request')" >
        </article-card>
        <h3 v-if="articleList.length ==0" style="color:white; position:fixed; background: rgba(105,105,105, 0.8);">
            You dont have any article yet. <br> Start posting your article by clicking 'New Article' on the navbar above. <br>
            Happy writing! </h3>
    </div>
    `
})