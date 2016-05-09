package org.cse.reduce;

import java.io.IOException;

import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class ReduceAverage extends Reducer<Text, Text, Text, Text> {

    public void reduce(Text key, Iterable<Text> values, Context context) 
      throws IOException, InterruptedException {
        int sum = 0;
        int count = 0;
        for (Text val : values) {
            sum += Integer.parseInt(val.toString().split(",")[0]);
            count += Integer.parseInt(val.toString().split(",")[1]);					
        }
        context.write(key, new Text("| "+(double) sum/count));
    }
 }