import {createStore} from "vuex";
import {repositoriesModule} from "@/store/repositoriesModule";
import {issuesModule} from '@/store/issuesModule'

export default createStore({
    modules: {
        repositories:repositoriesModule,
        issues: issuesModule
    }
})