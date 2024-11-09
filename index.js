class ThemeSwitcher {
    selectors = {
        switchThemeButton: "[data-js-theme-switcher]",
    }

    themes = {
        dark: "dark",
        light: "light",
    }

    stateClasses = {
        isDarkTheme: "is-dark-theme",
    }

    storageKey = "theme"

    constructor() {
        this.switchThemeButton = document.querySelector(this.selectors.switchThemeButton)
        // инициализация темы
        this.setInitialTheme()
        this.bindEvents()
    }

    // была ли в кэше localStorage ранее выбрана темная тема
    // сравниваем значение по ключу theme в storageKey
    // объявим через геттер, чтобы обращаться к методу как к св-ву
    // без ()
    get isDarkThemeCached() {
        return localStorage.getItem(this.storageKey) === this.themes.dark
    }

    setInitialTheme() {
        //! у toggle есть второй необязательный булевый параметр
        //! если он установлен в true, класс будет добавлен
        //! иначе будет удален
        //! isDarkThemeCached как раз проверяет это
        document.documentElement.classList.toggle(this.stateClasses.isDarkTheme, this.isDarkThemeCached)
    }

    // при килке устанавливаем противоположную тему
    onClick = () => {
        // меняем значения в localeStorage
        // если темная тема в кэше то меняем тему на светлую
        localStorage.setItem(this.storageKey, this.isDarkThemeCached ? this.themes.light : this.themes.dark)

        // добавляем или удаляем класс на корневом элементе
        document.documentElement.classList.toggle(this.stateClasses.isDarkTheme)
    }

    bindEvents() {
        this.switchThemeButton.addEventListener("click", this.onClick)
    }
}

new ThemeSwitcher()
