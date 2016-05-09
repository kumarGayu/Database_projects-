package org.cse.reduce;

import java.io.IOException;

import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class SumCountCombiner extends Reducer<Text, Text, Text, Text> {

	public void reduce(Text key, Iterable<Text> values, Context context) 
			throws IOException, InterruptedException {
		int sum = 0;
		int count = 0;
		for (Text val : values) {
			try{
				sum += Integer.parseInt(val.toString());
			}catch(Exception e){

			}
			count++;
		}
		context.write(key, new Text(""+sum+","+count));
	}
}
