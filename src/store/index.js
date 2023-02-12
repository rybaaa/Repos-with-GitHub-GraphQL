import {createStore} from "vuex";
import {repositoriesModule} from "@/store/repositoriesModule";

export default createStore({
    modules: {
        repositories:repositoriesModule
    }
})