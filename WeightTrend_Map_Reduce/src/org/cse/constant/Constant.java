package org.cse.constant;

import java.util.HashMap;

public class Constant {
	
	private static HashMap<String, String> state = new HashMap<String, String>();
	private static HashMap<String, String> gender = new HashMap<String, String>();
	static{
		state.put("06","California/CA");
		state.put("08","Colorado/CO");
		state.put("12","Florida/FL");
		state.put("42","Pennsylvania/PA");
		state.put("48","Texas/TX");
		state.put("50","Vermont/VT");
		state.put("53","Washington/WA");		
		gender.put("1", "Male");
		gender.put("2", "Female");
	}
	
	public static String getState(String val) {
		if (state.get(val) != null){
			return state.get(val);
		}else{
			throw new IllegalArgumentException("Illegal State");
		}
	}
	
	public static String getGender(String val) {
		if (gender.get(val) != null){
			return gender.get(val);
		}else{
			throw new IllegalArgumentException("Invalid gender");
		}
	}
}
