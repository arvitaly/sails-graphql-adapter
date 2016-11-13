import generate from './generate';
export default () => {
    sails['graphql'] = generate(sails.models);
}