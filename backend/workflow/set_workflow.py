import yaml

from workflow.get_network import get_network
from workflow.params import get_typecheck_params
from workflow.set_file import set_imagefile, set_csvfile, set_algofile
from cui_api.snakemake import write_snakemake_config


def set_workflow(unique_id, runItem):
    rules_to_execute, last_outputs, all_outputs = get_workflow(unique_id, runItem)

    flow_config = {
        "rules": rules_to_execute,
        "last_output": last_outputs,
    }
    
    write_snakemake_config(flow_config)


def get_workflow(unique_id, runItem):
    # graph networkの解析
    nodeDict, edgeList, endNodeList = get_network(runItem)

    nwbfile = get_typecheck_params(runItem.nwbParam, "nwb")

    rules_to_execute = {}
    last_outputs = []
    all_outputs = {}

    for node in nodeDict.values():
        algo_label = node['data']['label']
        algo_path = node['data']['path']

        if node["type"] == 'ImageFileNode':
            set_imagefile(node, edgeList, nwbfile)
        elif node["type"] == "CsvFileNode":
            set_csvfile(node, edgeList)
        elif node["type"] == "AlgorithmNode":
            rule = set_algofile(unique_id, node, edgeList, nodeDict)

            rules_to_execute[algo_label] = rule

            if node["id"] in endNodeList:
                last_outputs.append(rule["output"])

            all_outputs[rule["output"]] = {
                "label": algo_label,
                "path": algo_path,
            }

    return rules_to_execute, last_outputs, all_outputs