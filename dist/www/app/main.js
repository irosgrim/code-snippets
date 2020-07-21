Vue.use(VueCodemirror);
new Vue ({
    el: '#app',
    data: function () {
        return {
            searchInput: '',
            searchResults: [],
            oneNote: '',
            codeMirrorOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                mode: 'text/javascript'
              },
        }
    },
    mounted: function () {
        axios.get(`/note/4`).then(response => this.oneNote = response.data.note);
    }

})