using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace coverage
{
	class Program
	{
		static void Main(string[] args)
		{
			//config
			string appRoot = @"..\..\..\..\";
			string testRoot = @"..\..\..\tests";
			string sourcePattern = "*.js";
			string testPattern = "*.spec.js";
			string[] sourceNotPatterns = { ".spec.", "\\x-cluded\\", "\\pages.js" };
			string sourceHtmlHead = "	<script src=\"";
			string sourceHtmlTail = "\" data-cover></script>";
			string testHtmlHead = "	<script src=\"";
			string testHtmlTail = "\"></script>";
			string sourceTrim = "^..\\\\..\\\\";
			string testTrim = "^..\\\\..\\\\..\\\\tests\\\\";
			string runnerPath = @"..\..\..\tests\SpecRunner.html";
			string sourceStartTag = "<!-- include source files start -->";
			string sourceEndTag = "<!-- include source files end -->";
			string testStartTag = "<!-- include spec files start -->";
			string testEndTag = "<!-- include spec files end -->";

			//excecution
			var sources = GetFiles(appRoot, sourcePattern, sourceNotPatterns);
			sources = SortDependancies(sources);
			var sourceHtml = MakeHtml(sources, sourceHtmlHead, sourceHtmlTail, sourceTrim);
			ReplaceHtml(runnerPath, sourceHtml, sourceStartTag, sourceEndTag);

			var tests = GetFiles(testRoot, testPattern, null);
			var testHtml = MakeHtml(tests, testHtmlHead, testHtmlTail, testTrim);
			ReplaceHtml(runnerPath, testHtml, testStartTag, testEndTag);
		}

		static string[] GetFiles(string path, string pattern, string[] notPatterns)
		{
			List<string> files = new List<string>(Directory.GetFiles(path, pattern, SearchOption.AllDirectories));

			if (notPatterns != null)
			{
				foreach (var n in notPatterns)
				{
					files = files.Where(f => !f.Contains(n)).ToList();
				}
			}

			return files.ToArray();
		}

		static string MakeHtml(string[] files, string head, string tail, string trim)
		{
			StringBuilder html = new StringBuilder();

			foreach (var f in files)
			{
				html.Append(head);
				html.Append(Regex.Replace(f, trim, ""));
				html.Append(tail);
				html.Append(Environment.NewLine);
			}

			return html.ToString();
		}

		static string ReadFile(string path)
		{
			FileStream stream;
			StreamReader reader;
			string text = "";

			using (stream = new FileStream(path, FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite))
			{
				reader = new StreamReader(stream, Encoding.ASCII);
				text = reader.ReadToEnd();
				reader.Close();
			}

			return text;
		}

		static void ReplaceHtml(string path, string html, string start, string end)
		{
			FileStream stream;
			StreamWriter writer;
			var text = ReadFile(path);

			text = Regex.Replace(text, start + "(.*)[\\r\\n]+(\\t*)" + end, start + Environment.NewLine + html + "$2" + end, RegexOptions.Singleline);

			using (stream = new FileStream(path, FileMode.Create, FileAccess.ReadWrite, FileShare.ReadWrite))
			{
				using (writer = new StreamWriter(stream, Encoding.ASCII))
				{
					writer.Write(text);
					writer.Flush();
				}
			}
		}

		static string[] SortDependancies(string[] files) {
			List<Details> prioritized = new List<Details>();
			List<Details> unsorted = new List<Details>();

			foreach (var f in files)
			{
				var name = Regex.Match(f, @"([^\\]+).js+$").Groups[1].Value;
				var text = ReadFile(f);
				var dependsOn = Regex.Match(text, @"[\r\n]}[ \t\r\n]*\)[ \t\r\n]*\(([^)]+)\);");
				string[] dependancies = new string[0];
				if (dependsOn.Success)
				{
					dependancies = dependsOn.Groups[1].Value.Split(", ".ToCharArray());
				}

				unsorted.Add(new Details { Path = f, Name = name, Dependancies = dependancies });
			}
			prioritized = Prioritize(prioritized, unsorted);

			return prioritized.Select(p => p.Path).ToArray();
		}

		static List<Details> Prioritize(List<Details> prioritized, List<Details> unsorted)
		{
			var change = false;

			foreach (var d in unsorted[0].Dependancies)
			{
				var higher = unsorted.Where(u => u.Name == d).FirstOrDefault();
				if (higher != null)
				{
					change = true;
					unsorted.Remove(higher);
					unsorted.Insert(0, higher);
				}
			}

			if (change)
			{
				prioritized = Prioritize(prioritized, unsorted);
			}

			if (unsorted.Count > 0)
			{
				var lower = unsorted[0];
				unsorted.Remove(lower);
				prioritized.Add(lower);
			}

			if (unsorted.Count > 0) {
				prioritized = Prioritize(prioritized, unsorted);
			}

			return prioritized;
		}
	}
}
