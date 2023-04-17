import { ServiceCenterPage } from './app.po';

describe('service-center App', function() {
  let page: ServiceCenterPage;

  beforeEach(() => {
    page = new ServiceCenterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
