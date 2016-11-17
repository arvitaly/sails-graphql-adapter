import Model from "./model";
export default (sailsModel: Sails.Model): Model => {
    return new Model(sailsModel);
};
