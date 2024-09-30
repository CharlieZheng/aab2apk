
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod  save_file ;

use std::process::Command;
use std::io::{self, Write};


fn run_java() -> io::Result<()> {

    let _ = save_file::save_internal_file_to_desktop( );
    let java_output = Command::new("java")
        .arg("--version")  // Don't include ".class" in the argument
        .output()?;

    // Check if there was any error during execution
    if !java_output.status.success() {
        io::stderr().write_all(&java_output.stderr)?;
        return Err(io::Error::new(io::ErrorKind::Other, "Failed to run Java file"));
    }

    // Print the output from the Java program
    io::stdout().write_all(&java_output.stdout)?;

    Ok(())
}
#[tauri::command]
fn greet(name: &str) -> String {

    let _= run_java();
   format!("Hello, {}!", name)
}
fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


