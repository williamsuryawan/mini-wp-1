Vue.component('article-create', {
    components: {
        wysiwyg: vueWysiwyg.default.component,
        "tags-input": VoerroTagsInput
    },
    data () {
        return {
            newTitle: '',
            newStatus: '',
            text: '',
            newFile: '',
            newTag: '',
            imgFileRegReview: ''
        }
    }, 
    methods: {
        submitNewArticle () {
            this.$emit('submit-newarticle', {newTitle: this.newTitle, newStatus: this.newStatus, newText: this.text, newTag: this.newTag, newFile: this.newFile})
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
    },
    template: `
        <div class="col-md-6 mx-auto pt-10" style="background:  rgba(245, 245, 245, 0.9);">
            <form id="register_form" v-on:submit.prevent="submitNewArticle" >
                <div class="form-group">
                    <label for="titleCreate" style="color:black; font-size:16px;"> Article Title: </label>
                    <input type="text" class="form-control" 
                        placeholder="Enter article title here!" name="title" id="titleCreate" v-model="newTitle" required>
                </div>
                <div class="form-group" style="height:100px">
                    <wysiwyg v-model="text" />
                </div>
                <div class="form-group">
                    <label for="statusReg" style="color:black; font-size:16px;">Status:</label>
                    <select class="form-control" id="statusReg" v-model="newStatus" required>
                        <option>INCOMPLETE</option>
                        <option>COMPLETE</option>
                    </select>
                </div>
                <div class="form-group">
                <label for="tags" style="color:black; font-size:16px;">Tags (please enter before you add another tags):</label>
                    <tags-input element-id="tags"
                        v-model="newTag"
                        :typeahead="true"></tags-input>
                </div>
                <div class="row">
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
                </div>
                
                <button type="submit" class="btn btn-primary" id="register_button">Create Article</button>
                <button type="click" class="btn btn-danger" @click.prevent="showMyArticle()"> Cancel </button>
            </form>
        </div>
    `
})