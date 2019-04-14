Vue.component('navbar-section', ({
    props: ['isLogin'],
    data () {
        return {
            searchTag:''
        }
    },
    methods: {

    },
    template: `
    <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-dark">
        <a class="navbar-brand" href="#" style="color:white">Mini Wordpress by William Suryawan </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ml-5" id="navbarNavAltMarkup">
            <div class="navbar-nav" >
                <a class="nav-item nav-link active" href="#" v-if="!isLogin" @click.prevent="$emit('showallarticle-request')" style="color:white"> Home <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link active" href="#" v-if="isLogin" @click.prevent="$emit('showmyarticle-request')" style="color:white"> My Article <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link" href="#" v-if="!isLogin" @click.prevent="$emit('showallarticle-request')" style="color:white"> All Articles</a>
                <a class="nav-item nav-link" href="#" v-if="!isLogin" @click.prevent="$emit('showloginform-request', 'loginPage')" style="color:white">Login</a>
                <a class="nav-item nav-link" href="#" v-if="!isLogin" @click.prevent="$emit('showregisterform-request', 'registerPage')" style="color:white">Register</a>
                <a class="nav-item nav-link" href="#" v-if="isLogin" @click.prevent="$emit('signout-request')" style="color:white">Logout</a>
            </div>
        </div>
        <button class="btn btn-outline-success my-2 my-sm-0 mr-3" v-if="!isLogin" @click.prevent="$emit('invitelogin-request')" type="submit">New Article</button>
        <button class="btn btn-outline-success my-2 my-sm-0 mr-3" v-if="isLogin" @click.prevent="$emit('showcreatearticlepage-request', 'createArticle')" type="submit">New Article</button>
        <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchTag">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click.prevent="$emit('searchtag-request', searchTag)" >Search Tag</button>
        </form>
    </nav>
    `
}))