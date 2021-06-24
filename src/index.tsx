import { Vue, Component } from 'vue-property-decorator';
import './assets/style/index.less';

@Component({})
export default class App extends Vue {
  protected render() {
    return(
      <div id="app">
        <router-view/>
      </div>
    )
  }
}
