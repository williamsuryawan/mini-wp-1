const baseURL = `http://35.247.170.82`

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log("cek apa isi ini====", googleUser.getAuthResponse())
    
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("cek token google", id_token)
    let loginUser = {
        id_token: id_token,
        loginVia: 'googleSignIn'
    }
    axios
        .post(`${baseURL}/users/login`, loginUser)
        .then(response => {
            console.log("berhasil login", response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('loginVia', 'google')
            app.isLogin = true;
            app.currentPage = 'mainPage'
            app.showMyArticle()
        })
        .catch(error => {
            console.log("login gagal", error)
        })
}

let app = new Vue ({
    el: "#app",
    data: {
        isLogin: false,
        loginEmail: '',
        loginPassword: '',
        regName: '',
        regEmail: '',
        regPassword: '',
        articleList: [],
        allarticleList: [],
        articleData: {},
        content: {},
        contentReg: '',
        titleReg: '',
        tagsReg: '',
        statusReg: '',
        imgFileReg: '',
        imgFileRegReview: '',
        currentPage: 'homepage',
        searchTag: ''
    },
    created () {
        if(localStorage.getItem('token')){
            console.log("cek headers token true")
            this.verifyUser();
            this.currentPage = "mainPage"
            this.showMyArticle();
          } else {
            console.log("cek headers token false")
            this.isLogin = false;
            this.currentPage = "mainPage"
            this.showAllArticle();
          }
    },
    methods: {
        verifyUser() {
            axios
                .get(`${baseURL}/users/verify`, { headers: { token: localStorage.getItem('token') } })
                .then(response => {
                    console.log("result token verification", response.data)
                    if (response.data.data) {
                        this.isLogin = true;
                        console.log("token jwt valid")
                    } else {
                        console.log('token jwt not valid')
                        localStorage.removeItem('token');
                        this.isLogin = false;
                        Swal.fire({
                            type: 'error',
                            title: 'You dont have valid token',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.currentPage(loginPage);
                    }
                })
                .catch(error => {
                    console.log('terjadi error', error)
                })
        },
        changePage(input) {
            console.log("masuk ke changepage", input)
            this.currentPage = input
            console.log("hasil di changepage", this.currentPage)
        },
        successLogin () {
            this.isLogin = true;
            this.currentPage = 'mainPage';
        },
        successRegister () {
            this.currentPage = 'loginPage';
        },
        showMyArticle() {
            console.log("masuk ke method show my article")
            this.articleList = []
            axios
                .get(`${baseURL}/articles/myarticle`, { headers: { token: localStorage.getItem('token') } })
                .then(response => {
                    console.log("berhasil get my articles", response)
                    response.data.data.forEach(myarticle => {
                        this.articleList.push(myarticle)
                    })
                    console.log("hasil looping get my article", this.articleList)
                    this.currentPage='mainPage'
                })
                .catch(error => {
                    console.log('terjadi error show article', error)
                })
        },
        showAllArticle() {
            console.log("masuk ke method show all article")
            axios
                .get(`${baseURL}/articles`)
                .then(response => {
                    console.log("berhasil get my article", response)
                    this.allarticleList = []
                    response.data.forEach(allarticle => {
                        this.allarticleList.push(allarticle)
                    })
                    this.changePage('mainPage')
                })
                .catch(error => {
                    console.log('terjadi error show article', error)
                })
        },
        registerUser () {
            console.log("masuk ke method register user")
            let registerUser = {
                name: this.regName,
                email: this.regEmail,
                password: this.regPassword
            }
            axios
                .post(`${baseURL}/users/register`, registerUser)
                .then(response => {
                    console.log("berhasil register", response.data)
                    this.currentPage = 'loginPage';
                    Swal.fire({
                        type: 'success',
                        title: `${response.data.email} have successfully registered. Please login now.`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.regName =''
                    this.regEmail=''
                    this.regPassword=''
                })
        },
        loginUser() {
            console.log("masuk ke method login")
            let loginUser = {
                email:this.loginEmail,
                password: this.loginPassword,
                loginVia: 'website'
            }
            axios
                .post(`${baseURL}/users/login`, loginUser)
                .then(response => {
                    console.log("berhasil login", response)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('loginVia', 'website')
                    this.loginEmail = ''
                    this.loginPassword =''
                    this.isLogin = true
                    this.currentPage = 'mainPage'
                    this.showMyArticle();
                })
                .catch(error => {
                    console.log("login gagal", error)
                })
        },
        signOut () {
            Swal.fire({
                title: 'Do you want to leave?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sign Out'
              }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        type: 'success',
                        title: 'Log out is success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    if (localStorage.loginVia == 'google') {
                        var auth2 = gapi.auth2.getAuthInstance();
                        auth2.signOut().then(function () {
                            console.log('User via google signed out.');
                        });
                    }
                    localStorage.removeItem('token');
                    localStorage.removeItem('loginVia');
                    console.log('User signed out.');
                    this.isLogin = false;
                    this.currentPage = 'homePage'
                    this.showAllArticle();
                }
              })
        },
        inviteToLogin() {
            Swal.fire({
                type: 'error',
                title: 'You havent logged in. Please login now!',
                showConfirmButton: false,
                timer: 2000
            })
            this.currentPage = 'loginPage'
        },
        showOneArticle(input) {
            console.log("masuk ke function show one article to read only", input)
            this.articleData = {}
            axios
                .get(`${baseURL}/articles/${input._id}`, {headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.token
                }})
                .then(({data})=> {
                    console.log("berhasil show one article", data.data)
                    this.currentPage ='detailArticlePage'
                    this.articleData = data.data
                })
                .catch (err => {
                    console.log("Terjadi error show one article:", error)
                })
        },
        showOneArticleForEdit(input) {
            console.log("masuk ke function show one article for edit", input)
            this.articleData = {}
            axios
                .get(`${baseURL}/articles/${input._id}`, {headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.token
                }})
                .then(({data})=> {
                    console.log("berhasil show one article", data.data)
                    this.currentPage ='editArticlePage'
                    this.articleData = data.data
                })
                .catch (err => {
                    console.log("Terjadi error show one article:", error)
                })
        },
        
        createArticle (input) {
            console.log("masuk ke create article", input)
            let formData = new FormData()
                formData.append('image', input.newFile)
                formData.append('title', input.newTitle)
                formData.append('status', input.newStatus)
                formData.append('content', input.newText)
                formData.append('tags', input.newTag)
            console.log("masuk ke axios create article", formData)
            axios
                .post(`${baseURL}/articles/create`, formData,  {headers: {
                        'Content-Type': 'multipart/form-data',
                        token: localStorage.token
                    }})
                .then(({data}) => {
                    console.log("Berhasil create article:", data)
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your article has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.currentPage = "mainPage"
                    this.showMyArticle();
                })
                .catch(error =>{
                    console.log("Terjadi error create:", error)
                })
        },
        searchMyArticle(input) {
            console.log("masuk ke search my article", this.searchTag, input)
            let searchTagQuery = {
                tags: input
            }
            console.log(searchTagQuery)
            axios.get(`${baseURL}/articles/tags`, {params: searchTagQuery})
            .then(({data}) => {
                if(this.isLogin) {
                    this.articleList =[]
                    this.searchTagQueryonWebsite = ''
                    console.log("berhasil search my article", data)
                    data.data.forEach(article => {
                        this.articleList.push(article)
                    })
                    this.searchTagQueryonWebsite = this.searchTag
                    this.currentPage='mainPage'
                    this.searchTag = ''
                } else {
                    this.allarticleList =[]
                    this.searchTagQueryonWebsite = ''
                    console.log("berhasil search all article", data)
                    data.data.forEach(article => {
                        this.allarticleList.push(article)
                    })
                    this.searchTagQueryonWebsite = this.searchTag
                    this.currentPage='mainPage'
                    this.searchTag = ''
                }
            })
            .catch(error => {
                console.log("Terjadi error search article:", error)
            })
        }
    },
    computed: {
        sesuatu: function() {
            return 'hahahaha' + this.searchTag
        }
    }
})
