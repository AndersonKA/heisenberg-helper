import Ember from 'ember';
import validator from './validator';

export default Ember.Controller.extend({
  validator,
  actions: {
    async registerUser(changeset) {
      await changeset.validate();

      if (changeset.get('isInvalid')) {
        return alert('Username already exists');
      }

      await changeset.save();

      const user = this.store.createRecord('user', this.model);

      try {
        await user.save();

        this.transitionToRoute('login');
      } catch (e) {
        user.deleteRecord();

        alert('That username already exists in the system');
      }
    },
  },
});
