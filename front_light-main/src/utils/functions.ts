/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonObject, GroupNode, models } from ".";
import { Ability, Group, ModelType, User } from "./api-types";

export function getSizeString(size: number = 0) {
  if (size < 1024) return size + " B";
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + " KB";
  if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(2) + " MB";
  return (size / 1024 / 1024 / 1024).toFixed(2) + " GB";
}

export const CleanObject = (obj: Record<string, unknown>): Record<string, unknown> => {
  const newObj: Record<string, unknown> = {};

  Object.keys(obj || {}).forEach((key) => {
    const value = obj[key];
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !(
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(value).length === 0
      ) &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      newObj[key] = value;
    }
  });

  return newObj;
};
export function toggleWindowFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

export function toggleElementFullScreen(element: HTMLElement) {
  if (!document.fullscreenElement) element.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

export function stringify(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value?.toFixed(2);
  return JSON.stringify(value);
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function fetchAndSaveFile(fileUrl: string, fileName: string) {
  const ext = fileUrl.split(".").pop();
  fetch(fileUrl, { method: "GET" })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName + "." + ext);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
}

export const getPermissionLevel = (
  user: User | null | undefined,
  model: ModelType,
  groupId: string
) => {
  if (!user) return 0;
  if (user.isSuperAdmin) return 3;
  const abilities = user?.roles.find((role) => role.groupId === groupId)?.role
    .abilities;
  if (!abilities) return 0;

  const permission = abilities.find((ability) => ability.model === model);
  if (!permission) return 0;
  if (permission.permission === "MANAGE") return 3;
  if (permission.permission === "WRITE") return 2;
  if (permission.permission === "READ") return 1;
  return 0;
};

export const generateRandomString = (
  length: number,
  duplicate = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
) => {
  if (!duplicate) {
    if (length > characters.length)
      throw new Error(
        "Length must be less than or equal characters length to avoid duplicate characters"
      );
    for (const char of characters) {
      if (characters.split(char).length - 1 > 1)
        throw new Error(
          "Characters must be unique to avoid duplicate characters"
        );
    }
  }
  let result = "";
  const charactersLength = characters.length;
  for (let index = 0; index < length; index++) {
    let char = characters.charAt(Math.floor(Math.random() * charactersLength));
    if (!duplicate) {
      while (result.includes(char)) {
        char = characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    }
    result += char;
  }
  return result;
};

export const flattenGroups = (groups: Group[] | undefined): Group[] => {
  if (!groups) return [];
  return groups.flatMap((group) => {
    return [group, ...flattenGroups(group.subGroups)];
  });
};

export const flatten = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  parentKey = "",
  res: JsonObject = {},
  sep: string = "."
) => {
  for (const key in obj) {
    const propName = parentKey ? `${parentKey}${sep}${key}` : key;
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      res[propName] = obj[key];
      flatten(obj?.[key], propName, res, sep);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

export function detectBrowser() {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge";
  } else if (userAgent.match(/msie|trident/i)) {
    browserName = "Internet Explorer";
  }

  return browserName;
}
export function Utf8ArrayToStr(array: any) {
  let out = "",
    i = 0,
    c,
    c2,
    c3;
  const len = array.length;
  while (i < len) {
    c = array[i++];
    if (c < 128) {
      out += String.fromCharCode(c);
    } else if (c < 224) {
      c2 = array[i++];
      out += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
    } else if (c < 240) {
      c2 = array[i++];
      c3 = array[i++];
      out += String.fromCharCode(
        ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
      );
    }
  }
  return out;
}

export const makePic = (video_element: HTMLVideoElement, id: string, width: number, height: number) => {

  const canvas = document.getElementById("canvas_screen") as HTMLCanvasElement;
  if (!canvas) return;
  canvas.width = width / 3
  canvas.height = height / 3
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(video_element, 0, 0, canvas.width, canvas.height);
  const images = localStorage.getItem("stream_images");
  const imagesObject = images ? JSON.parse(images) : {};
  const data = canvas.toDataURL();
  imagesObject[id] = {
    image: data,
    width: canvas?.width,
    height: canvas?.height
  }
  localStorage.setItem("stream_images", JSON.stringify(imagesObject));
  return data;
};

export function groupByHour(
  data: {
    x: Date;
    y: number;
  }[]
) {
  const result: {
    x: Date;
    y: number;
  }[] = [];
  data.forEach((item) => {
    const last = result[result.length - 1];
    const date: Date = new Date(item.x);
    date.setMinutes(0, 0, 0);
    if (!last || new Date(last.x).getTime() !== date.getTime()) {
      result.push({
        x: date,
        y: item.y,
      });
    }
    if (last && new Date(last.x).getTime() === date.getTime()) {
      last.y += item.y;
    }
  });
  return result;
}

export function groupByDay(
  data: {
    x: Date;
    y: number;
  }[]
) {
  const result: {
    x: Date;
    y: number;
  }[] = [];
  data.forEach((item) => {
    const last = result[result.length - 1];
    const date: Date = new Date(item.x);
    date.setHours(0, 0, 0, 0);
    if (!last || new Date(last.x).getTime() !== date.getTime()) {
      result.push({
        x: date,
        y: item.y,
      });
    }
    if (last && new Date(last.x).getTime() === date.getTime()) {
      last.y += item.y;
    }
  });
  return result;
}

export function groupByWeek(
  data: {
    x: Date;
    y: number;
  }[]
) {
  const result: {
    x: Date;
    y: number;
  }[] = [];
  data.forEach((item) => {
    const last = result[result.length - 1];
    const date: Date = new Date(item.x);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - date.getDay());
    if (!last || new Date(last.x).getTime() !== date.getTime()) {
      result.push({
        x: date,
        y: item.y,
      });
    }
    if (last && new Date(last.x).getTime() === date.getTime()) {
      last.y += item.y;
    }
  });
  return result;
}


export const isMarkerInsidePolygon = (
  marker: [number, number],
  polygon: [number, number][]
) => {
  let x = marker[0];
  let y = marker[1];

  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i][0];
    let yi = polygon[i][1];
    let xj = polygon[j][0];
    let yj = polygon[j][1];

    let intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

export const concatGroups = (site: Group | undefined, area: Group | undefined) => {
  if (site && area) {
    return [site, area];
  }
  if (site) {
    return [site];
  }
  return [];
};

export const getCameraLocation = (group: Group) => {
  if (!group) return "";
  return `${group.parent?.name ?? ""} - ${group.name}`;
};

export function buildTree(
  user: User,
  obj: Group,
  parent: GroupNode | null
): GroupNode {
  const ability = models.reduce((acc, model) => {
    const permission = getPermissionLevel(user, model.name, obj.id);
    acc[model.name] = permission;
    return acc;
  }, {} as Record<ModelType, number>);

  const children =
    obj.subGroups?.map((child) => buildTree(user, child, null)) || [];
  return new GroupNode(obj, ability, parent, children);
}

export const findNode = (node: GroupNode, id: string): GroupNode | null => {
  if (node.id === id) {
    return node;
  }
  for (const child of node.children) {
    const found = findNode(child, id);
    if (found) {
      return found;
    }
  }
  return null;
};

export const getHighestAbility = (
  node: GroupNode | null,
  model: ModelType
): number => {
  if (!node) {
    return 0;
  }
  return Math.max(
    node.ability[model],
    getHighestAbility(node.parent || null, model)
  );
};

export const getAllGroupIds = (node: GroupNode): string[] => {
  const ids = [node.id];
  for (const child of node.children) {
    ids.push(...getAllGroupIds(child));
  }
  return ids;
};

export function findUserAbilitiesInGroup(
  groupId: string,
  userRoles: { groupId: string; role: { abilities: Ability[] } }[]
): Ability[] {
  const userGroup = userRoles.find((group) => group.groupId === groupId);
  return userGroup ? userGroup.role.abilities : [];
}

export function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}