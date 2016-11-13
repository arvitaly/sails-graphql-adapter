import generate from './generate';
export default () => {
    sails['schema'] = generate(sails.models);
}