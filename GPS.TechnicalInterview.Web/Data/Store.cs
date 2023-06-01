using System.Collections.Generic;
using GPS.ApplicationManager.Web.Models;
using JsonFlatFileDataStore;

namespace GPS.ApplicationManager.Web.Data;

public class Store
{
  private DataStore store = new DataStore("Data/data.json");
  private IDocumentCollection<Application> applicationCollection;

  public Store()
  {
    this.applicationCollection = store.GetCollection<Application>("applications");
  }

  public IEnumerable<Application> getAllApplications()
  {
    return applicationCollection.Find("");;
  }

  public IEnumerable<Application> getApplication(string applicationNumber)
  {
    return applicationCollection.Find(a => a.ApplicationNumber == applicationNumber);
  }

  public async void createApplication(Application data)
  {
    await applicationCollection.InsertOneAsync(data);
  }

  public async void updateApplication(Application data)
  {
    await applicationCollection.UpdateOneAsync(a => a.ApplicationNumber == data.ApplicationNumber, data);
  }

  public async void deleteApplication(string applicationNumber)
  {
    await applicationCollection.DeleteOneAsync(a => a.ApplicationNumber == applicationNumber);
  }

}