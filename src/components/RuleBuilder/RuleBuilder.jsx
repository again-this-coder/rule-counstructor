import React, { useState } from "react";
import FilterSelector from "../FilterSelector/FilterSelector";
import "./RuleBuilder.css";

const RuleBuilder = () => {
  const [groups, setGroups] = useState([
    {
      rules: [{ field: "", condition: "equals", value: "" }],
    },
  ]);
  const [filters, setFilters] = useState(["age", "payer"]);
  const [newFilter, setNewFilter] = useState("");
  const [generatedJSON, setGeneratedJSON] = useState("");

  const handleFieldChange = (event, index, groupIndex) => {
    const updatedRules = [...groups];
    updatedRules[index].rules[groupIndex].field = event.target.value;
    setGroups(updatedRules);
  };

  const handleConditionChange = (event, index, groupIndex) => {
    const updatedRules = [...groups];
    updatedRules[index].rules[groupIndex].condition = event.target.value;
    setGroups(updatedRules);
  };

  const handleValueChange = (event, index, groupIndex) => {
    const updatedRules = [...groups];
    updatedRules[index].rules[groupIndex].value = event.target.value;
    setGroups(updatedRules);
  };

  const handleLogicalOperatorChange = (event, index) => {
    const updatedRules = [...groups];
    updatedRules[index].logicalOperator = event.target.value;
    setGroups(updatedRules);
  };

  const addRule = (index) => {
    const updatedRules = [...groups];
    updatedRules[index].rules.push({
      field: "",
      condition: "equals",
      value: "",
    });
    setGroups(updatedRules);
  };

  const addGroup = () => {
    const updatedRules = [...groups];
    updatedRules.push({
      rules: [{ field: "", condition: "equals", value: "" }],
    });
    setGroups(updatedRules);
  };

  const removeRule = (index, groupIndex) => {
    const updatedRules = [...groups];
    if (groupIndex !== undefined) {
      updatedRules[index].rules.splice(groupIndex, 1);
    } else {
      updatedRules.splice(index, 1);
    }
    setGroups(updatedRules);
  };

  const generateJSON = () => {
    const jsonRules = groups.map((rule) => {
      const logicalOperator =
        rule.rules.length >= 2 ? rule.logicalOperator || "AND" : undefined;

      return {
        field: rule.field,
        condition: rule.condition,
        value: rule.value,
        logicalOperator,
        rules: rule.rules,
      };
    });

    const jsonString = JSON.stringify(jsonRules, null, 2);
    setGeneratedJSON(jsonString);
  };

  const handleNewFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addNewFilter = () => {
    if (newFilter.trim() !== "") {
      setFilters([...filters, newFilter.trim()]);
      setNewFilter("");
    }
  };

  return (
    <div className="rule-builder-container">
      <h2 className="rule-builder-title">Rule Builder</h2>
      <div>
        <input
          type="text"
          placeholder="Enter new filter"
          value={newFilter}
          onChange={handleNewFilterChange}
          className="new-filter-input"
        />
        <button className="add-group" onClick={addNewFilter}>
          Add Filter
        </button>
      </div>
      {groups.map((rule, index) => (
        <div key={index} className="rule-builder-rule">
          <h3>Group {index + 1}</h3>
          {rule.rules.length > 1 && (
            <div>
              <h4>Logical operator for Group {index + 1}</h4>
              <select
                className="margin-bottom"
                value={rule.logicalOperator}
                onChange={(e) => handleLogicalOperatorChange(e, index)}
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            </div>
          )}

          <div>
            {rule.rules.map((groupRule, groupIndex) => (
              <div key={groupIndex}>
                <FilterSelector
                  filters={filters}
                  selectedFilter={groupRule.field}
                  onChange={(e) => handleFieldChange(e, index, groupIndex)}
                />
                <select
                  value={groupRule.condition}
                  onChange={(e) => handleConditionChange(e, index, groupIndex)}
                  className="additional-padding"
                >
                  <option value="equals">equals</option>
                  <option value="greaterThan">greater than</option>
                </select>
                <input
                  type="text"
                  value={groupRule.value}
                  onChange={(e) => handleValueChange(e, index, groupIndex)}
                />
                <button
                  className="remove-rule margin-bottom"
                  onClick={() => removeRule(index, groupIndex)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="add-buttons-container">
            <button className="add-rule" onClick={() => addRule(index)}>
              Add Rule
            </button>
            <button className="remove-group" onClick={() => removeRule(index)}>
              Remove Group {index + 1}
            </button>
          </div>
        </div>
      ))}
      <button className="add-group" onClick={addGroup}>
        Add Group
      </button>
      <div className="rule-builder-section">
        <button className="generate-json bg-green" onClick={generateJSON}>
          Generate JSON
        </button>
      </div>
      <div className="rule-builder-json">
        <textarea value={generatedJSON} readOnly />
      </div>
    </div>
  );
};

export default RuleBuilder;
