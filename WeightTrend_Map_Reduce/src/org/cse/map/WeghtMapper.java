package org.cse.map;

import java.io.IOException;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.cse.constant.Constant;

public class WeghtMapper extends Mapper<LongWritable, Text, Text, Text>{

	public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		String[] tokenizer = value.toString().split(",");
		try{
			String customKey = tokenizer[0].substring(0,4)+"|"+Constant.getGender(tokenizer[69])+"|"+Constant.getState(tokenizer[5]);
			context.write(new Text(customKey), new Text(tokenizer[7]));
		}catch(Exception e){
			
		}
	}
}
