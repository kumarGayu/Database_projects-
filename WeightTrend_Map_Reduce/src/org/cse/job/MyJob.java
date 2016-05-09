package org.cse.job;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.cse.map.WeghtMapper;
import org.cse.reduce.ReduceAverage;
import org.cse.reduce.SumCountCombiner;

public class MyJob {

	public static void main(String[] args) throws Exception {
	    Configuration conf = new Configuration();
	    Job job = Job.getInstance(conf, "Average weight");
	    job.setJarByClass(MyJob.class);
	    job.setMapperClass(WeghtMapper.class);
	    job.setCombinerClass(SumCountCombiner.class);
	    job.setReducerClass(ReduceAverage.class);
	    job.setOutputKeyClass(Text.class);
	    job.setOutputValueClass(Text.class);
	    FileInputFormat.addInputPath(job, new Path(args[0]));
	    FileOutputFormat.setOutputPath(job, new Path(args[1]));
	    System.exit(job.waitForCompletion(true) ? 0 : 1);
	  }
}
