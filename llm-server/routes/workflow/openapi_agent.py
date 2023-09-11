import yaml
from langchain.agents import create_openapi_agent
from langchain.agents.agent_toolkits import OpenAPIToolkit
from langchain.llms.openai import OpenAI
from langchain.requests import RequestsWrapper
from langchain.tools.json.tool import JsonSpec
import os

def run_openapi_agent(spec_file_path: str, prompt: str) -> None:
    with open(spec_file_path) as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
    json_spec = JsonSpec(dict_=data, max_value_length=4000)

    headers = {"Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}"}
    openai_requests_wrapper = RequestsWrapper(headers=headers)

    openapi_toolkit = OpenAPIToolkit.from_llm(
        OpenAI(temperature=0), json_spec, openai_requests_wrapper, verbose=True
    )
    openapi_agent_executor = create_openapi_agent(
        llm=OpenAI(temperature=0), toolkit=openapi_toolkit, verbose=True
    )

    openapi_agent_executor.run(prompt)

# Example usage
# run_openapi_agent("openai_openapi.yaml", "Make a post request to openai /completions. The prompt should be 'tell me a joke.'")
