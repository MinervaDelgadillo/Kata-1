const fetch = require('node-fetch')

class EmailData {
    
    baseUrl = 'http://api.guerrillamail.com/ajax.php'
    sid = null

    name  = 'yama user'
    email = null
    inbox = []
    password = null

    ACTIONS = { 
      get_address: 'get_email_address',
      check_inbox: 'check_email',
      get_inbox: 'get_email_list',
      fetch_email: 'fetch_email'
    }

    // https://api.guerrillamail.com/ajax.php?f=get_email_list&offset=0&sid_token=lmmb0hfqa6qjoduvr2vdenas62 

    async init() {
        let url = this.baseUrl + '?f=' + this.ACTIONS.get_address
        let data = await fetch(url).then(res => res.json())
        
        this.email = data.email_addr
        this.sid   = data.sid_token

        this.password = Math.random().toString(36).substr(2, 8) + 'a1'
    }

    async checkInbox() {
        let url = this.baseUrl + 
                  '?f=' + this.ACTIONS.get_inbox +
                  '&sid_token=' + this.sid +
                  '&offset=0'
        // console.log(url)

        const res = await fetch(url).then(res=>res.json())

        if (res.list) {
          this.inbox = res.list
        }
        console.log(`inbox have ${this.inbox.length} messages`)

        return (this.inbox)
    }

    get inboxText() {
        return JSON.stringify(this.inbox)
    }

    searchFor(from, subject) {
        const found = this.inbox.filter( mail => mail.mail_from === from )
        if (!subject) {
            const found = found.filter( mail => mail.mail_subject === subject)
        }
        return found
    }

    lastFetched = null

    async fetch(id) {
        let url = this.baseUrl + 
          '?f=' + this.ACTIONS.fetch_email +
          '&sid_token=' + this.sid +
          '&email_id=' + id

        this.lastFetched = await fetch(url).then(res=>res.json())

        return this.lastFetched
    }
}

module.exports = FakeEmailData;

