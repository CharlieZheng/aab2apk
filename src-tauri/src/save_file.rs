use tauri::api::path::desktop_dir;
use std::fs::File;
use std::io::Write;

pub fn save_internal_file_to_desktop() -> Result<(String ), String>     {
    let file_name  = "bundletool-all-1.17.1.jar";
    // 获取桌面路径
    let desktop_path = desktop_dir().ok_or("无法找到桌面路径")?;

    // 构建目标文件路径
    let mut target_path = desktop_path.clone();
    target_path.push(file_name);

    // 读取内置文件内容
    let file_content = include_bytes!( "../assets/bundletool-all-1.17.1.jar" );

    // 保存文件到桌面路径
    let mut file = File::create(target_path).map_err(|e| e.to_string())?;
    file.write_all(file_content).map_err(|e| e.to_string())?;

    Ok((   ))
}
