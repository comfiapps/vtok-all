using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultNamespace;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _env;
    public EmployeeController(IConfiguration configuration,IWebHostEnvironment env)
    {
        _configuration = configuration;
        _env = env;
    }

    [HttpGet]
    public IActionResult Get()
    {
        string query = @"
                    select EmployeeId,EmployeeName,Department,
                    DATE_FORMAT(DateOfJoining,'%Y-%m-%d') as DateOfJoining,
                    PhotoFileName
                    from 
                    Employee
        ";

        DataTable table = new DataTable();
        string sqlDataSource = _configuration.GetConnectionString("DBServer");
        MySqlDataReader myReader;
        using (MySqlConnection db = new MySqlConnection(sqlDataSource))
        {
            db.Open();
            using (MySqlCommand myCommand = new MySqlCommand(query, db))
            {
                myReader = myCommand.ExecuteReader();
                table.Load(myReader);

                myReader.Close();
                db.Close();
            }
        }

        return Ok(table);
    }


    [HttpPost]
    public IActionResult Post(Employee emp)
    {
        string query = @"
                    insert into Employee 
                    (EmployeeName,Department,DateOfJoining,PhotoFileName) 
                    values
                     (@EmployeeName,@Department,@DateOfJoining,@PhotoFileName) ;
                    
        ";

        DataTable table = new DataTable();
        string sqlDataSource = _configuration.GetConnectionString("DBServer");
        MySqlDataReader myReader;
        using (MySqlConnection db = new MySqlConnection(sqlDataSource))
        {
            db.Open();
            using (MySqlCommand myCommand = new MySqlCommand(query, db))
            {
                myCommand.Parameters.AddWithValue("@EmployeeName", emp.EmployeeName);
                myCommand.Parameters.AddWithValue("@Department", emp.Department);
                myCommand.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);
                myCommand.Parameters.AddWithValue("@PhotoFileName", emp.PhotoFileName);

                myReader = myCommand.ExecuteReader();
                table.Load(myReader);

                myReader.Close();
                db.Close();
            }
        }

        return Ok("Added Successfully");
    }


    [HttpPut]
    public IActionResult Put(Employee emp)
    {
        string query = @"
                    update Employee set 
                    EmployeeName =@EmployeeName,
                    Department =@Department,
                    DateOfJoining =@DateOfJoining,
                    PhotoFileName =@PhotoFileName
                    where EmployeeId=@EmployeeId;
                    
        ";

        DataTable table = new DataTable();
        string sqlDataSource = _configuration.GetConnectionString("DBServer");
        MySqlDataReader myReader;
        using (MySqlConnection db = new MySqlConnection(sqlDataSource))
        {
            db.Open();
            using (MySqlCommand myCommand = new MySqlCommand(query, db))
            {
                myCommand.Parameters.AddWithValue("@EmployeeId", emp.EmployeeId);
                myCommand.Parameters.AddWithValue("@EmployeeName", emp.EmployeeName);
                myCommand.Parameters.AddWithValue("@Department", emp.Department);
                myCommand.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);
                myCommand.Parameters.AddWithValue("@PhotoFileName", emp.PhotoFileName);

                myReader = myCommand.ExecuteReader();
                table.Load(myReader);

                myReader.Close();
                db.Close();
            }
        }

        return Ok("Updated Successfully");
    }



    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        string query = @"
                    delete from Employee 
                    where EmployeeId=@EmployeeId;
                    
        ";

        DataTable table = new DataTable();
        string sqlDataSource = _configuration.GetConnectionString("DBServer");
        MySqlDataReader myReader;
        using (MySqlConnection db = new MySqlConnection(sqlDataSource))
        {
            db.Open();
            using (MySqlCommand myCommand = new MySqlCommand(query, db))
            {
                myCommand.Parameters.AddWithValue("@EmployeeId", id);

                myReader = myCommand.ExecuteReader();
                table.Load(myReader);

                myReader.Close();
                db.Close();
            }
        }

        return Ok("Deleted Successfully");
    }


    [Route("SaveFile")]
    [HttpPost]
    public IActionResult SaveFile()
    {
        try
        {

            var httpReuest = Request.Form;
            var postedFile = httpReuest.Files[0];
            string filename = postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

            using(var stream=new FileStream(physicalPath, FileMode.Create))
            {
                postedFile.CopyTo(stream);
            }

            return new JsonResult(filename);
        }
        catch (Exception)
        {

            return Ok("anonymous.png");
        }
    }
}