import $ from '../vendors/jquery.min.js'

class Common {
    constructor(wrap) {
        this.wrap= $(wrap)
    }
    isToEnd($viewport, $content){
        return $viewport.height() + $viewport.scrollTop() +10 > $content.height()
    }

}

export  default Common
