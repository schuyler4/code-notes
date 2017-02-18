var New = new Vue({
  el: '#new',
  data: {
    title: '',
    code: '',
    notes: JSON.parse(localStorage.getItem('notes')),
    error: ''
  },
  methods: {
    checkInput: function() {
      if(this.title != '' &&  this.code != '') {
        return true
      }
      this.error = 'You must fill everything out.'
      return false
    },

    saveNoteOnClick: function() {
      if(this.checkInput()) {
        var note = { title: this.title, code: this.code, clicks: 0 }
        this.notes.push(note)
        localStorage.setItem('notes', JSON.stringify(this.notes))
        this.backOnClick()
      }
    },

    backOnClick: function() {
      window.location.href='index.html'
    }
  }
})
