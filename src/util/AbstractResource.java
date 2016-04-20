package util;

import java.io.File;
import java.io.IOException;

import javax.ws.rs.NotFoundException;

public class AbstractResource {
	protected File file(String parent, String path) {
		return file(new File(parent, path).getPath());
	}

	protected File file(String path) {
		if (!exists(path)) {
			throw new NotFoundException();
		}
		return new File("web", path);
	}

	protected boolean exists(String path) {
		if (path.endsWith("/")) {
			return false;
		}

		try {
			File root = new File("web");
			File file = new File(root, path);
			if (!file.exists()
					|| !file.getCanonicalPath().startsWith(
							root.getCanonicalPath())) {
				return false;
			}

			return true;
		} catch (IOException e) {
			return false;
		}
	}
}
