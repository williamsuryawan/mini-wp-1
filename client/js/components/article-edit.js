Vue.component('article-edit', {
    props: ['articleData'],
    components: {
        wysiwyg: vueWysiwyg.default.component,
        "tags-input": VoerroTagsInput
    },
    data () {
        return {
            newFile: '',
            imgFileRegReview: '',
            changeImage: false
        }
    }, 
    created() {
        console.log("component article edit is created")
    },
    methods: {
        editThisArticle (articleId) {
            Swal.fire({
                title: 'Finish edit your article?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.value) {
                    if(!this.changeImage) {
                        
                        let input = {
                            title: this.articleData.title,
                            status: this.articleData.status,
                            content: this.articleData.content,
                            tags: this.articleData.tags,
                            featured_image: this.articleData.featured_image}
                        console.log("Data edit tanpa ubah image:", this.articleData._id, input )
                        axios
                            .put(`${baseURL}/articles/${this.articleData._id}`, input,  {headers: {
                                token: localStorage.token
                            }})
                            .then(({data}) => {
                                console.log("Berhasil edit article tanpa ubah image", data)
                                Swal.fire({
                                    position: 'top-end',
                                    type: 'success',
                                    title: 'Your article has been updated',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                this.$emit('showmyarticle-request')
                            })
                            .catch(error =>{
                                console.log("Terjadi error create:", error)
                            })
                    } else {
                        console.log("masuk ke edit article and image", articleId)
                        let formData = new FormData()
                            formData.append('image', this.newFile)
                            formData.append('title', this.articleData.title)
                            formData.append('status', this.articleData.status)
                            formData.append('content', this.articleData.content)
                            formData.append('tags', this.articleData.tags)
                        console.log("masuk ke axios edit article and image", formData)
                        axios
                            .put(`${baseURL}/articles/fulledit/${articleId}`, formData,  {headers: {
                                    'Content-Type': 'multipart/form-data',
                                    token: localStorage.token
                                }})
                            .then(({data}) => {
                                console.log("Berhasil edit article dan ubah image", data)
                                Swal.fire({
                                    position: 'top-end',
                                    type: 'success',
                                    title: 'Your article and image have been updated',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                this.$emit('showmyarticle-request')
                            })
                            .catch(error =>{
                                console.log("Terjadi error create:", error)
                            })
                    }
            
                }
              })     
        },
        handleFileUpload(event) {
            // this.file = event.file.files[0]
            console.log("masuk file upload", this.$refs.file)
            this.newFile = this.$refs.file.files[0];
            this.imgFileRegReview = URL.createObjectURL(this.newFile)
        },
        removeFile () {
            this.newFile ='';
            this.imgFileRegReview = '';
        },
        enableImageRequest() {
            if(!this.changeImage) {
                this.changeImage = true;
            } else {
                this.changeImage = false;
            }
        }
    },
    template: `
        <div class="col-md-6 mx-auto pt-10" style="background:  rgba(245, 245, 245, 0.9);">
            <form id="register_form"  >
                <div class="form-group">
                    <label for="titleCreate" style="color:black; font-size:16px;"> Article Title: </label>
                    <input type="text" class="form-control" 
                        placeholder="Enter article title here!" name="title" id="titleCreate" v-model="articleData.title" required>
                </div>
                <div class="form-group" style="height:100px">
                    <wysiwyg v-model="articleData.content" />
                </div>
                <div class="form-group">
                    <label for="statusReg" style="color:black; font-size:16px;">Status:</label>
                    <select class="form-control" id="statusReg" v-model="articleData.status" required>
                        <option>INCOMPLETE</option>
                        <option>COMPLETE</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tagsReg" style="color:black; font-size:16px;">Tags (please enter before you add another tags):</label>
                    <tags-input element-id="tags"
                        v-model="articleData.tags"
                        :typeahead="true"></tags-input>
                </div>
                <div class="row" v-if="!changeImage">
                    <div class="col-6">    
                        <img :src="articleData.featured_image" style="width:50%"/>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-primary" v-on:click="enableImageRequest"> Change Image </button>
                    </div>
                </div>
                <div class="row" v-if="changeImage">
                    <div class="col-6">
                        <div class="form-group mx-auto" style="width: 50%">
                            <label for="exampleInputFile">Upload Your Article Photo Here</label>
                            <input type="file" id="file" class="inputFile" ref="file" v-on:change="handleFileUpload" required/>
                            <button type="submit" class="btn btn-danger btn-sm mt-2"  v-if="imgFileRegReview" v-on:click="removeFile()" >Remove File</button>
                        </div>
                    </div>
                    <div class="col-6">
                        <h6 style="text-align: center">Preview Picture: </h6>
                        <img v-if="imgFileRegReview" :src="imgFileRegReview" style="width:50%"/>
                        <p v-if="!imgFileRegReview" style="text-align: center"> You haven't selected any picture for your article</p>
                    </div>
                    <button class="btn btn-primary" v-on:click="enableImageRequest"> Cancel Edit Image </button>
                </div>
                
                <button type="submit" class="btn btn-primary" id="register_button" v-if="!changeImage" v-on:click.prevent="editThisArticle">Edit Article</button>
                <button type="submit" class="btn btn-primary" id="register_button" v-if="changeImage" v-on:click.prevent="editThisArticle(articleData._id)">Edit Article</button>
                <button type="click" class="btn btn-danger" @click.prevent="$emit('showmyarticle-request')"> Cancel </button>
            </form>
        </div>
    `
})