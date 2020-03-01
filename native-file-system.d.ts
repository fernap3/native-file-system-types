interface FileSystemHandlePermissionDescriptor {
	writable?: boolean;
}

interface FileSystemHandle {
	isFile: boolean;
	isDirectory: boolean;
	name: string;
	queryPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
	requestPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
}

interface FileSystemCreateWriterOptions {
	keepExistingData?: boolean;
}

interface FileSystemFileHandle extends FileSystemHandle {
	getFile(): Promise<File>;
	createWriter(options?: FileSystemCreateWriterOptions): Promise<FileSystemWriter>;
}

interface FileSystemGetFileOptions {
	create?: boolean;
}

interface FileSystemGetDirectoryOptions {
	create?: boolean;
}

interface FileSystemRemoveOptions {
	recursive?: boolean;
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
	getFile(name: string, options?: FileSystemGetFileOptions): Promise<FileSystemFileHandle>;
	getDirectory(name: string, options?: FileSystemGetDirectoryOptions): Promise<FileSystemDirectoryHandle>;
	getEntries(): AsyncIterableIterator<FileSystemHandle>;
	removeEntry(name: string, options?: FileSystemRemoveOptions): Promise<void>;
}

interface FileSystemWriter {
	write(position: number, data: BufferSource | Blob | string): Promise<void>;
	truncate(size: number): Promise<void>;
	close(): Promise<void>;
}

type ChooseFileSystemEntriesType = "open-file" | "save-file" | "open-directory";

interface ChooseFileSystemEntriesOptionsAccepts {
	description: string;
	mimeTypes: string[];
	extensions: string[];
}

interface ChooseFileSystemEntriesOptions {
	type?: ChooseFileSystemEntriesType;
	multiple?: boolean;
	accepts?: ChooseFileSystemEntriesOptionsAccepts[];
	excludeAcceptAllOption?: boolean;
}

interface Window {
	chooseFileSystemEntries(options?: ChooseFileSystemEntriesOptions): Promise<FileSystemHandle | FileSystemHandle[]>;
}

type SystemDirectoryType = "sandbox";

interface GetSystemDirectoryOptions {
	type: SystemDirectoryType;
}

interface FileSystemDirectoryHandleConstructor {
	getSystemDirectory(options: GetSystemDirectoryOptions): Promise<FileSystemDirectoryHandle>;
}

declare var FileSystemDirectoryHandle: FileSystemDirectoryHandleConstructor;
