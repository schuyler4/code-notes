var index = new Vue({
  el: '#index',

  data: {
    notes: null,
    toggledCode: '',
    selectedIndex: null,
    codeToggled: false,
    editing: false,
    editBtnText: 'Edit',
    editInputText: ''
  },

  methods: {
    newOnClick: function() {
      window.location.href='new.html'
    },

    loadData: function() {
      var notes = JSON.parse(localStorage.getItem('notes'))
      if(notes === null) {
        localStorage.setItem('notes', JSON.stringify([]))
      }

      if(this.notes != null) {
        notes.forEach(function(i, object) {
          return { title: object.title, code: object.code, toggled: false}
        })
      }

      this.notes = this.sortNotes(notes)
    },

    sortNotes: function(notes) {
      if(notes.length == 0) {
        return []
      }

      let sortedNotes = []
      sortedNotes.push(notes[0])

      notes.forEach(function(note, i) {
        const comparison = sortedNotes[sortedNotes.length - 1]

        if(i != 0) {
          if(note.clicks > comparison.clicks ||
              note.clicks === comparison.clicks) {
            sortedNotes.push(note)
          } else {
            sortedNotes.unshift(note)
          }
        }
      })

      return sortedNotes.reverse()
    },

    noteClicked: function(index) {
      if(this.toggledCode === '') {
        this.toggledCode = this.notes[index].code
        this.selectedIndex = index
        this.codeToggled = true

        this.addClick(index)
      } else if(index != this.selectedIndex) {
        this.toggledCode = this.notes[index].code
        this.selectedIndex = index
        this.codeToggled = true

        this.addClick(index)
      } else {
        this.toggledCode = ''
        this.codeToggled = false
        this.editing = false
        this.editBtnText = 'Edit'
        this.editInputText = ''
      }
    },

    addClick: function(index) {
      this.notes[index].clicks += 1
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },

    deleteClicked: function() {
      this.notes.splice(this.selectedIndex)
      this.codeToggled = false
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },

    editClicked: function() {
      if(!this.editing) {
        this.editing = true
        this.editBtnText = 'Done'
        this.editInputText = this.notes[this.selectedIndex].code
      } else {
        if(this.editInputText != '') {
          this.notes[this.selectedIndex].code = this.editInputText
          localStorage.setItem('notes', JSON.stringify(this.notes))
          this.editing = false
          this.editBtnText = 'Edit'
          this.editInputText = ''
          this.codeToggled = false
        }
      }
    }
  }
})

index.loadData()
