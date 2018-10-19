import Markdown from '../components/Markdown';

export default class Page extends Markdown {
  document = () => {
    return {
      document: require('../../components/tooltip/demo.md'),
      className: 'tooltip-page',
    };
  }
}
