import Ember from 'ember';
import validator from './validator';

export default Ember.Controller.extend({
  formValues: {},

  validator,
  actions: {
    async addItem(changeset) {
      await changeset.validate();

      if (changeset.get('isInvalid')) {
        return alert('Please fill out both fields of the form.');
      }

      await changeset.save();
      const item = this.store.createRecord('item', this.model);

      item.save();

      this.transitionToRoute('dashboard');
    },

    toggleModal() {
      this.transitionToRoute('dashboard');
    },
  }
});
