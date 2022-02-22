module.exports = class HomePage {

  createCourse(name) {
      name = this.name || new Date().toLocaleString()
      console.warn(name)

      document.querySelector('.create_course').click()
      let inputName = document.querySelector('.input')
      inputName.setValue(name)

      return require('../pageobjects/course.page.js')
  }

  openCourse(name) {
      // $('.').click()
  }

  get userBadge() { return $('.user__info_normal') }

  get currentUser() {
      $('.user__info_normal').waitForExist()
      return $('.user__info_normal').getText()
  }

}