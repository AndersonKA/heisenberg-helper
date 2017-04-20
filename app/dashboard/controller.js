import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  formValues: {
    time: '',
  },

  unwrappedModel: Ember.computed('model.@each.totalTime', function () {
    return this.model.map(x => x.toJSON());
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },

    deleteItem(item) {
      item.destroyRecord();
    },

    addTime() {
      const time = this.store.createRecord('time', this.formValues);

      // this.model is the model from 'project/detail'
      time.set('item', this.model);

      return time.save().then(() => {
        this.set('formValues', {});
        this.transitionToRoute('dashboard');
      });
    },
  },
});
