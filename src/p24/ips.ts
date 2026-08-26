import {BlockList} from "net";

export const validIps = [
    '5.252.202.255',
    '5.252.202.254',
    '20.215.81.124',
    '193.178.213.0/24',
    '91.220.177.0/24',
    '20.215.183.48/28',
    '134.112.88.8/29',
];

export const blockList = new BlockList();
for (const entry of validIps) {
    if (entry.includes('/')) {
        const [ip, prefix] = entry.split('/');
        const parsed = parseInt(prefix, 10)
        if (!Number.isNaN(parsed)) blockList.addSubnet(ip, parsed);
    } else {
        blockList.addAddress(entry);
    }
}