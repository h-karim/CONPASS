export default function (spec) {
  spec.describe('Switch Campuses', () => {
    spec.it('Switches to SGW Campus', async () => {
      console.log('Testing SGW');
      await spec.exists('SwitchCampuses');
      await spec.press('SwitchCampuses.SetSGWButton');
    });
    spec.it('Switches to Loyola Campus', async () => {
      console.log('Testing Loyola');
      await spec.exists('SwitchCampuses');
      await spec.press('SwitchCampuses.SetLoyolaButton');
    });
  });
}
