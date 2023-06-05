using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using GPS.ApplicationManager.Web.Models;

namespace GPS.ApplicationManager.Web.Services
{
	public class TempDataService
	{
		private readonly string _tempDataPath;
		public TempDataService()
		{
			_tempDataPath = System.AppDomain.CurrentDomain.BaseDirectory + "tempdata.json";
		}


		public async Task<List<Application>> ReadTempData()
		{
			List<Application> applications = new List<Application>();
			try
			{
				using (StreamReader reader = new StreamReader(_tempDataPath))
				{
					string jsonString = await reader.ReadLineAsync();
					List<Application> jsonApplications = JsonSerializer.Deserialize<List<Application>>(jsonString);
					if (jsonApplications != null)
					{
						applications = jsonApplications;
					}
				}
			} catch { }

			return applications;
		}


		private async Task<List<Application>> WriteTempData(List<Application> applications)
		{
			string jsonString = JsonSerializer.Serialize(applications);
			using (StreamWriter writer = System.IO.File.CreateText(_tempDataPath))
			{
				await writer.WriteAsync(jsonString);
			}
			return applications;
		}


		public async Task<Application> UpdateTempData(Application application)
		{
			List<Application> applications = await ReadTempData();
			int applicationIndex = applications.FindIndex(app => app.ApplicationNumber == application.ApplicationNumber);
			if (applicationIndex < 0) {
				return null;
			}
			applications[applicationIndex] = application;
			await WriteTempData(applications);
			return application;
		}



		public async Task<Application> CreateTempData(Application application)
		{
			List<Application> applications = await ReadTempData();
			bool applicationExists = applications.Find(app => app.ApplicationNumber == application.ApplicationNumber) != null;
			if (applicationExists) {
				return null;
			}
			applications.Add(application);
			await WriteTempData(applications);
			return application;
		}



		public async Task<List<Application>> RemoveTempData(string applicationNumber)
		{
			List<Application> applications = await ReadTempData();
			applications.RemoveAll(application => application.ApplicationNumber == applicationNumber);
			return await WriteTempData(applications);
		}


	}
}
