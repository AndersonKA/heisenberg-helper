import Ember from 'ember';
import validator from './validator';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  validator,
  actions: {
    async loginUser(changeset) {
      await changeset.validate();

      if (changeset.get('isInvalid')) {
        return alert('The login information is invalid');
      }

      await changeset.save();

      try {
        await this.get('session').authenticate('authenticator:jwt', {
          identification: this.get('model.email'),
          password: this.get('model.password'),
        });
      } catch (err) {
        console.log('oops', err);
        if (err) {
          this.set('errorMessage', err.errors[0].title);
        } else {
          return alert('Authentication failed!');
        }
      }
    },
  },
});
